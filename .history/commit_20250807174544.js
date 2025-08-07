import chokidar from 'chokidar';
import simpleGit from 'simple-git';

const git = simpleGit();
let timeout = null;

function getTimestampMessage() {
    const now = new Date();
    return `UPDATE : ${now.toLocaleString()}`;
}

async function commitAndPush() {
    const status = await git.status();
    if (status.files.length === 0) {
        console.log('🟢 Tidak ada perubahan. Tidak commit.');
        return;
    }

    console.log('📦 Terdeteksi perubahan, melakukan commit dan push...');
    try {
        await git.add('.');
        await git.commit(getTimestampMessage());
        await git.push();
        console.log('✅ Commit dan push berhasil!');
    } catch (error) {
        console.error('❌ Terjadi error saat git commit/push:', error);
    }
}

// Pantau seluruh direktori kecuali node_modules dan .git
chokidar.watch('.', {
    ignored: /(^|[\/\\])\..|node_modules/,
    persistent: true
}).on('all', (event, path) => {
    console.log(`📁 File berubah: ${path} (${event})`);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        commitAndPush();
    }, 3 * 60 * 1000); // Tunggu 3 menit setelah perubahan terakhir
});