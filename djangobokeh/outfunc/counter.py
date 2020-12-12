import time as t
import string as s
import inspect
alphabet = s.ascii_letters[:26]  # to get only letters with lowercase

def get_rid_of_garbage(text):
    return text.lower().translate(text.lower().maketrans('','',s.punctuation+"1234567890 "))

def time(func):
    def wrapper(*args, **kwargs):
        init = t.time()
        a=func()
        lst = t.time()
        print(lst - init)
        return a

    return wrapper


def counter(line):
    line = line.lower()
    d = dict.fromkeys(alphabet, 0)
    for i in alphabet:
        d[i] = line.count(i)
    return d
def counter_general_eng():
    file = open('text.txt', 'r')
    line=file.read().lower()
    return counter(line)
