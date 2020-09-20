from django.shortcuts import render 
from hist.counter import counter
from bokeh.embed import components
from bokeh.plotting import figure, output_file, show, ColumnDataSource, save
from bokeh.models.tools import HoverTool
from bokeh.transform import factor_cmap # grdient
from bokeh.palettes import all_palettes
from bokeh.io import curdoc
import ipywidgets

def home(request):
    d=counter()
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
            sorted_d={k: v for k, v in sorted(d.items(), key=lambda item: item[1])}
            values=list(sorted_d.values())
            keys=list(orted_d.keys())
        elif option=='desc':
            sorted_d={k: v for k, v in sorted(d.items(), key=lambda item: item[1])}
            values=list(sorted_d.values())[::-1]
            keys=list(sorted_d.keys())[::-1]
            

    context={}

    #look at template bokeh_test
    #look how choose spot where to plot it
    print("here")
    print(request.method)
    if request.method!="POST":
        print("get form")
        print(request.GET.get("az"))
        if request.POST.get("az"):
            print("come to az")
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
    #color_gradient=all_palettes['Viridis'][26]
    p.vbar(
    x=keys,
    top=values,

    width=0.4,
    fill_alpha=0.7, 
    )
    p.xaxis.major_label_text_font_size="14pt"
    script, div = components(p)
    context["script"]=script
    context["div"]=div
    ipywidgets.interact(change_value, option=drop_down)
    curdoc()._set_title("sds")
    return render(request,"index.html",context)

def calculus(request):
    return render(request,"calculus.html")

def about(request):
    return render(request, "about.html")