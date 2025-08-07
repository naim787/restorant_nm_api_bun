import chokidar from 'chokidar';
import simpleGit from 'simple-git';

const git = simpleGit();
let timeout = null;

function getTimestampMessage() {
    const now = new Date();
    return `Update: ${now.toLocaleString()}`;
}

async function commitAndPush() {
    const status = await git.status();
    if (status.files.length === 0) {
        console.log('🟢 Tidak ada perubahan. Tidak commit.');
        return;
    }

    console.log('📦 Melakukan add, commit, dan push...');
    try {
        // Gunakan ./\* agar untracked juga ikut
        await git.add('./*');
        await git.commit(getTimestampMessage());
        await git.push();
        console.log('✅ Sukses commit dan push!');
    } catch (error) {
        console.error('❌ Error saat git commit/push:', error);
    }
}

chokidar.watch('.', {
    ignored: /(^|[\/\\])\..|node_modules/,
    persistent: true
}).on('all', (event, path) => {
    console.log(`📁 Perubahan terdeteksi: ${path} (${event})`);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        commitAndPush();
    }, 1 * 60 * 1000); // Tunggu 1 menit dari perubahan terakhir
});