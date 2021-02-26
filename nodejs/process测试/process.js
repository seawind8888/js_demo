function asyncGetProcessData() {
  process.on('message', (m) => {
      console.log('子进程收到消息', m)
      process.send(m);
      process.exit(1)
  });
}

asyncGetProcessData()
