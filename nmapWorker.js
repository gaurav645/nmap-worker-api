const { exec } = require('child_process');

function runNmapWorker(target, callback) {
  exec(`nmap -sS -sV -T4 ${target} -oX nmap_results.xml`, (err, stdout, stderr) => {
    if (err) {
      callback(err)
    } else {
      exec('shodan search nmap -f nmap_results.xml', (err, stdout, stderr) => {
        if (err) {
          callback(err);
        } else {
          callback(null, stdout);
        }
      });
    }
  });
}