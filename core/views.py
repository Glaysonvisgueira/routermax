from django.shortcuts import render
from django.http import HttpResponse

def home(request):
	return render(request,'home.html',{'usuario': 'Glayson Visgueira'})

def contact(request):
	return render(request,'contact.html')

def devs(request):
	return render(request,'sobre.html')

def about(request):
	return render(request,'about.html')

	
