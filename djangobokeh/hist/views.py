from django.shortcuts import render
from outfunc.counter import counter, counter_general_eng
from bokeh.embed import components
from bokeh.plotting import figure, output_file, show, ColumnDataSource, save
from bokeh.models.tools import HoverTool
from bokeh.transform import factor_cmap  # grdient
from bokeh.palettes import all_palettes
from bokeh.io import curdoc
from outfunc.counter import counter
from outfunc.cezar import crypt, vigener_cipher, encrypt_vernam
from rest_framework.decorators import api_view
from rest_framework.response import Response
from random import randint, choice
from outfunc.rsa import is_coprime, get_e, get_d
from outfunc.elgamal import generate_keys, signature, legal_check
from primesieve import *

def home(request):
    # d=counter()
    """
    keys=list(d.keys())
    values=list(d.values())
    drop_down = ipywidgets.Dropdown(options=['az', 'za', 'asc', 'desc'],
                                value='az',
                                description='sort by:',
                                disabled=False)
    def change_value(option):
        if option=='az':
            keys=list(d.keys())
            values=list(d.values())
        elif option=='za':
            keys=keys[::-1]
            values=values[::-1]
        elif option=='asc':
            sorted_d={k: v for k, v in sorted(
                d.items(), key=lambda item: item[1])}
            values=list(sorted_d.values())
            keys=list(orted_d.keys())
        elif option=='desc':
            sorted_d={k: v for k, v in sorted(
                d.items(), key=lambda item: item[1])}
            values=list(sorted_d.values())[::-1]
            keys=list(sorted_d.keys())[::-1]

    """
    context = {}

    # look at template bokeh_test
    # look how choose spot where to plot it
    """
    if request.method!="POST":

        if request.POST.get("az"):
            d=counter()
            keys=list(d.keys())
            values=list(d.values())
        elif request.POST.get("za"):

            keys=list(d.keys()).reverse()
            values=list(d.values()).reverse()


    p = figure(
        x_range=keys,
        plot_width=1200,
        plot_height=500,
        title="Histogram",
        y_axis_label="Repeats",
        tools="crosshair, reset, wheel_zoom"
    )
    p.toolbar.logo=None
    # color_gradient=all_palettes['Viridis'][26]
    p.vbar(
    x=keys,
    top=values,

    width=0.4,
    fill_alpha=0.7,
    )
    p.xaxis.major_label_text_font_size="14pt"
    script, div = components(p)
    print(type(div))
    print(div)
    context["script"]=script
    context["div"]=div
    """
    return render(request, "index.html", context)


def cryptology(request):

    return render(request, "cryptology/crypting.html")


def calculus(request):
    return render(request, "calculus.html")


def about(request):
    return render(request, "about.html")


def cezar(request):
    context = {}
    if request.method == "POST":
        selected = request.POST.get("select")
        filed = request.POST.get("file")
        uploaded1 = request.FILES['file']
        contentOfFile = uploaded1.read()
        d = counter(contentOfFile.decode("utf-8"))

        sorted_d = {k: v for k, v in sorted(
            d.items(), key=lambda item: item[1])}
        v = list(sorted_d.values())
        k = list(sorted_d.keys())

        if selected == "az":
            k = list(d.keys())
            source = ColumnDataSource(
                data=dict(x=list(d.keys()), y=list(d.values())))
        elif selected == "za":
            k = list(d.keys())[::-1]
            source = ColumnDataSource(
                data=dict(x=list(d.keys())[::-1], y=list(d.values())[::-1]))
        elif selected == "asc":
            source = ColumnDataSource(data=dict(x=k, y=v))
        elif selected == "desc":
            k = k[::-1]
            source = ColumnDataSource(data=dict(x=k[::-1], y=v[::-1]))

        hover = HoverTool()
        hover.tooltips = """
  <div>
    <h3>@x</h3>
    <div><strong>Repeats: </strong>@y</div>
  </div>
"""
        p = figure(
                x_range=k,
        plot_width=900,
        plot_height=400,
        title="Histogram",
        y_axis_label="Repeats"
    )
        p.vbar(
                x='x',
                top='y',
                width=0.4,
                fill_alpha=0.7,
                source=source
    )
        p.add_tools(hover)
        script, div = components(p)

        context["script"] = script
        context["div"] = div

    return render(request, "cryptology/cezar.html", context)


def freq(request):
    # key='qazwsxedcrfvtgbyhnujmikolp'
    key = ''
    context = {}
    outputtext = 'something'
    if request.method == "POST":
        text = request.POST.get("intext")
        key = str(request.POST.get("key"))
        selected = request.POST.get("select")
        if text:
            if selected == 'en':
                print('here')
                outputtext = encrypt_vernam(text, key)
            elif selected == 'de':
                outputtext = encrypt_vernam(text, key, True)
        else:
            uploaded1 = request.FILES['file']
            contentOfFile = uploaded1.read()
            if selected == 'en':
                outputtext = encrypt_vernam(contentOfFile.decode("utf-8"), key)
            elif selected == 'de':
                outputtext = encrypt_vernam(
                    contentOfFile.decode("utf-8"), key, True)
            text = contentOfFile.decode("utf-8")
        context['val'] = outputtext
        context['valin'] = text

    context['val'] = outputtext
    return render(request, "cryptology/freq.html", context)


def finmath(request):
    return render(request, "finmath.html")

# new something here))


def rsa_view(request):
    return render(request, "cryptology/rsa.html")

def elgamal_view(request):
    return render(request, "cryptology/elgamal.html")

          
@api_view(['GET','POST'])
def rsa(request):
    if request.method == 'POST':
        message = request.data['message']
        key = int(request.data['key'])
        N = int(request.data['N'])
        result =''
        for i in message:
            result+=chr((ord(i)**key)%N)
        return Response({"result":result})
    else:
        p = nth_prime(randint(1,100))  
        q = nth_prime(randint(1,100))
        N = p*q
        phi = (p-1)*(q-1)
        e = get_e(phi, N)
        print(e)
        d = get_d(e,phi)
        if d==e:
            d = get_d(e,phi,d)
        print(d)
        return Response({"privateKey":d, "publicKey":e, "mod":N})
    return Response({'action':'it is finished'})




@api_view()
def elgamal_generate_key(request):
    resp = generate_keys()
    return Response(resp)