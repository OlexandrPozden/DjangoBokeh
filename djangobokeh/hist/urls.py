from django.urls import path
from .views import home, calculus, about, cezar, freq, cryptology, finmath

urlpatterns=[ 
    path('',home,name="home"),
    path('calculus/', calculus, name="calculus"),
    path('about/', about, name="about"),
    path('cezar/',cezar, name="cezar"),
    path('freq/',freq, name="freq"),
    path('cryptology/', cryptology, name="crypt"),
    path('finmath/', finmath, name="finmath"),
]