from Crypto.Util.number import *
from Crypto import Random
import Crypto
import libnum
import sys
from random import randint
import hashlib

bits=60
msg="Hello"

if (len(sys.argv)>1):
        msg=str(sys.argv[1])
if (len(sys.argv)>2):
        bits=int(sys.argv[2])

p = Crypto.Util.number.getPrime(bits, randfunc=Crypto.Random.get_random_bytes)
g=2

s= randint(0, p-1)
v = pow(g,s,p)

e= Crypto.Util.number.getPrime(bits, randfunc=Crypto.Random.get_random_bytes)
# e_1=(gmpy2.invert(e, p-1))
e_1=(libnum.invmod(e, p-1))
#D=  bytes_to_long(msg.encode('utf-8')) // if you want direct signing

D = int.from_bytes(hashlib.sha256(msg.encode()).digest(),byteorder='big' )

S_1=pow(g,e, p)
S_2=((D-s*S_1)*e_1) % (p-1)

v_1 = (pow(v,S_1,p)*pow(S_1,S_2,p))%p
v_2 = pow(g,D,p)

print ("Message: %s " % msg)
print ("g: %s" % g)
print ("p: %s" % p)
print ("\nv: %s" % v)
print ("e: %s" % e)
print ("\ns: %s" % s)

print ("\nS_1= %s" % S_1)
print ("S_2=%s" % S_2)
print ("\nV_1=%s" % v_1)
print ("v_2=%s" % v_2)
