import time as t
import string as s
import inspect
alphabet = s.ascii_letters[:26]  # to get only letters with lowercase


def time(func):
    def wrapper(*args, **kwargs):
        init = t.time()
        a=func()
        lst = t.time()
        print(lst - init)
        return a

    return wrapper


def counter():
    file = open('hist/text.txt', 'r')
    line = file.read().lower()
    d = dict.fromkeys(alphabet, 0)
    print(type(line))
    for i in alphabet:
        d[i] = line.count(i)
    file.close()
    return d