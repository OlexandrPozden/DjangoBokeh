import numpy as np
from primesieve import *

def is_coprime(x,y):
    return np.gcd(x,y) == 1

def get_e(phi, N):
    for i in range(2, phi):
        if is_coprime(i,phi) and is_coprime(i,N):
            return i
    return -1


def get_d(e,phi,i = -1):
    eq = -1
    while eq!=1:
        i+=1     
        eq = (e*i)%phi
    return i