# 每隔两小时更新token
0 */2 * * * /home/ubuntu/crontab/updateToken.sh

# */1 * * * * /home/ubuntu/crontab/updateToken.sh

# 每十分钟读取是否有面试安排
00,10,20,30,40,50 * * * * /home/ubuntu/crontab/notifySign.sh

# */1 * * * * /home/ubuntu/crontab/notifySign.sh

# 每天十一点半更新之前的面试状态
30 23 * * *  /home/ubuntu/crontab/giveupSign.sh

 */1 * * * * /home/ubuntu/crontab/giveupSign.sh
