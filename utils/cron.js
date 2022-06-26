import Cron from 'cron';

export default function setJob (schedule, cb) {
    const onTick = () => {
        console.log('start');
        cb();
        console.log('end');
    };
    const job = new Cron.CronJob(schedule, onTick, null, true, 'Asia/Shanghai');
    job.start();
}
