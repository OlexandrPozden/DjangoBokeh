from django.urls import path
from .views import home, calculus, about

urlpatterns=[ 
    path('',home,name="home"),
    path('calculus/', calculus, name="calculus"),
    path('about/', about, name="about")
]