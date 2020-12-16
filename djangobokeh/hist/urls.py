from django.urls import path
from .views import home, calculus, about, cezar, freq, cryptology, finmath, rsa_view,rsa, elgamal_view, elgamal_generate_key

urlpatterns=[ 
    path('',home,name="home"),
    path('calculus/', calculus, name="calculus"),
    path('cryptology/', about, name="about"),
    path('cezar/',cezar, name="cezar"),
    path('freq/',freq, name="freq"),
    path('finmath/', finmath, name="finmath"),
    path('cryptology/rsa',rsa_view,name="rsa"),
    path('cryptology/rsa/api/key', rsa),
    path('cryptology/elgamal',elgamal_view,name="elgamal"),
    path('cryptology/elgamal/api/generate-key', elgamal_generate_key),
    
]