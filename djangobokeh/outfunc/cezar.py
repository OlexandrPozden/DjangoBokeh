# a-97
# z-122
import string as s

alphabet = s.ascii_letters[:26]  # to get only letters with lowercase




def char2bits(s=''):
    return bin(ord(s))[2:].zfill(8)

#rint(char2bits('d'))

def bits2char(b=None):
    return chr(int(b, 2))

#print(bits2char(char2bits('d')))

def encrypt_vernam(message, key, decode=False):
    while len(message)>len(key):
        key+=key
    ## constants
    fake_null = ''.zfill(8)
    message=message[::-1] ## is reversed fo next operation
    bin_key=[]
    message_key=[]
    for i in range(len(key)):
        bin_key.append( char2bits(key[i]))
        try:
            message_key.append ( char2bits(message[i]) )
        except:
            message_key.append ( fake_null )

    message_key=message_key[::-1]

    for i in range(len(key)):
        message_key[i] = bin(int(message_key[i],2)^int(bin_key[i],2))[2:].zfill(8)

    ## decode from bytes to chars 
    ## but before this we have to remove all '00000000' elements in message_key
    messaged =''
    for i in message_key:
        messaged+=bits2char(i)
    return messaged


#test_key='zwrnijr23j)@#94u!@@HWIEUh'
#test_message='hello world'
#print(encrypt_vernam(test_message, test_key))
#print(encrypt_vernam(encrypt_vernam(test_message, test_key),test_key,True))



def checker(k):
    '''
    input: int
    return: int

    ** It is used only for Cezar cipher. If added number is out of range of ASCII ENG alphabet
     then it is returns to the start of alphabet [or to the end] **
    '''
    if k > 122:
        return 97+k-123   #IMPORTANT CHECK BEFORE USE! #Al right!
    elif k < 97:
        return 122+k-96
    else:
        return k


def checker_vigener(k):
    while k > 122:
        k = 97 + k - 123 
    while k < 97:
        k = 122 + 96 - k
        k = checker_vigener(k)
    return k

#print(checker_vigener(130))
def make_full_alph(key):
    '''
    input: str
    return: str

    ** In case key lenght is less than 26 it adds unique letter from alphabet **
    '''
    key = correct_key(key)
    return key+alphabet.translate(alphabet.maketrans('', '', key))


def goal_translter(key):
    '''
    input: str
    return: str

    ** Cezar cipher. It adds ASCII number of which word to ASCII number of ENG alphabet. 
    As result we gets new alphabet ** 
    '''
    return "".join([chr(checker(ord(l)+key)) for l in alphabet])


def correct_key(key):
    '''
    input: str
    return: str

    **delete all non unique words in key**

    '''
    result_key = ''
    for i in key:
        if i not in result_key:
            result_key += i
    return result_key


def crypt(text, key, decode=False):
    '''
    input: str, str, bool
    return: str
    ** Returns encoded[decoded] text with Monoalphabetic cipher.**
    '''

    converted_alphabet = make_full_alph(key)

    text = text.lower().translate(text.lower().maketrans('', '', s.punctuation +
                                                         "1234567890"))  # getting rid off all numbers and punctuations signs
    if decode:
        translition = text.maketrans(converted_alphabet, alphabet)
    else:
        translition = text.maketrans(alphabet, converted_alphabet)
    return text.translate(translition)


def vigener_cipher(text, key, decode=False):
    text = text.lower().translate(text.lower().maketrans('', '', s.punctuation +
                                                         "1234567890 "))  # getting rid off all numbers and punctuations signs
    while len(key) < len(text):
        key += key
    if decode:

        for k in range(len(text)-1):
            text = text[:k]+chr(checker(ord(text[k])-ord(key[k])+96))+text[k+1:]
        text=text[:-1] + chr(checker(ord(text[-1])-ord(key[-1])+96))
    else:
        for k in range(len(text)):
            text = text[:k]+chr(checker(ord(text[k])+ord(key[k])-96))+text[k+1:]
        text=text[:-1] + chr(checker(ord(text[-1])+ord(key[-1])-96))
    return text


# print(crypt("sdfdgfdgf","abf"))
