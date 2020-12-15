from Crypto.Util.number import *
from Crypto import Random
import Crypto
import libnum
import sys
from random import randint
import hashlib



bits=60

def generate_keys():
    p = Crypto.Util.number.getPrime(bits, randfunc=Crypto.Random.get_random_bytes)
    g = randint(1,p)
    x = randint(1, p-1)
    y = pow(g,x,p)
    return {'publicKey': {'p':p,'g':g,'y':y},'privateKey':x}

def signature(msg,p,g,x):
    k = Crypto.Util.number.getPrime(bits, randfunc=Crypto.Random.get_random_bytes)
    D = int.from_bytes(hashlib.sha256(msg.encode()).digest(),byteorder='big' )
    e_1=(libnum.invmod(e, p-1))  
    S_1=pow(g,k, p)
    S_2=((D-x*S_1)*e_1) % (p-1)
    return {"signedMessage":{'s1':S_1,:'s2':S_2}}

def legal_check(msg,p,g,y,S_1,S_2):
    v_1 = (pow(y,S_1,p)*pow(S_1,S_2,p))%p
    v_2 = pow(g,D,p)
    print(v_1)
    print(v_2)
    return v_1 == v_2