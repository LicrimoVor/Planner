
import requests
TOKEN = '5748107759:AAHJGwsxh1YI20m3s5T2-4xyMgbbW_OCj88'
chat_id = 5475709054
message = "hello from your telegram bot"
url = f"https://api.telegram.org/bot{TOKEN}/sendMessage?chat_id={chat_id}&text={message}"
print(requests.get(url).json())