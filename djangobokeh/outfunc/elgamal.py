import Cryptodome
from Cryptodome.Util.number import *
from Cryptodome import Random
import libnum
import sys
from random import randint
import hashlib
from primesieve import *



bits=60


def is_coprime(x,y):
    return np.gcd(x,y) == 1

def get_k(phi, N):
    for i in range(2, phi):
        if is_coprime(i,phi) and is_coprime(i,N):
            return i
    return -1

def generate_keys():
    p = nth_prime(randint(1,160))
    g = randint(1,p-1)
    x = randint(1, p-1)
    y = pow(g,x,p)
    #return p,g,y,x
    return {'publicKey': {'p':p,'g':g,'y':y},'privateKey':x}

def signature(msg,p,g,x):
    p=int(p)
    g=int(g)
    x=int(x)
    k = randint(1,p-1)
    D = int.from_bytes(hashlib.sha256(msg.encode()).digest(),byteorder='big' )
    #e_1=(libnum.invmod(k, p-1)) 
    k_1 = k**(-1) 
    S_1=pow(g,k, p)
    S_2=((D-x*S_1)*k_1) % (p-1)
    #return S_1,S_2
    return {'s1':S_1,'s2':S_2}

def legal_check(msg,p,g,y,S_1,S_2):
    p=int(p)
    g=int(g)
    y=int(y)
    S_1 = int(S_1)
    S_2 = int(S_2)
    D = int.from_bytes(hashlib.sha256(msg.encode()).digest(),byteorder='big' )
    v_1 = (pow(y,S_1,p)*pow(S_1,S_2,p))%p
    v_2 = pow(g,D,p)
    print(v_1)
    print(v_2)
    res = int(v_1 == v_2)
    return {'res':res}

#msg = 'somethin'    
#p,g,y,x = generate_keys()
#S_1, S_2 = signature(msg,p,g,x)

#print(legal_check(msg,p,g,y,S_1,S_2))