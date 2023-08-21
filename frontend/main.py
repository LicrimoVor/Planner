import streamlit as st
import requests


data = requests.api.get("http://127.0.0.1:8000/api/users/me", headers={'Authorization': 'Token 23bbf5512db220284eb3cc60cc5e5435a8a42a74'})

print(data.json())