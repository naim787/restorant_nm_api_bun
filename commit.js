import chokidar from 'chokidar';
import simpleGit from 'simple-git';

const git = simpleGit();
let lastCommitTime = 0;
const COMMIT_INTERVAL = 1 * 60 * 1000;
const now = new Date();

function getTimestampMessage() {
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
        await git.add('.');
        await git.commit(getTimestampMessage());
        await git.push();
        lastCommitTime = Date.now();
        console.log('✅ Sukses commit dan push!');
    } catch (error) {
        console.error('❌ Error saat git commit/push:', error);
    }
}

async function maybeCommit() {
    const now = Date.now();
    if (now - lastCommitTime >= COMMIT_INTERVAL) {
        await commitAndPush();
    } else {
        const sisa = ((COMMIT_INTERVAL - (now - lastCommitTime)) / 1000).toFixed(1);
        console.log(`⏳ Menunggu ${sisa} detik lagi sebelum commit berikutnya...`);
    }
}

chokidar.watch('.', {
    ignored: /(^|[\/\\])\..|node_modules/,
    persistent: true
}).on('all', (event, path) => {
    console.log(`📁 Perubahan terdeteksi: ${path} (${event})`);
    maybeCommit();
});