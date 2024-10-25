from django.shortcuts import render, get_object_or_404, redirect
from .models import Service, Booking
from django.contrib.auth.decorators import login_required

# Create your views here.

def service_list(request):
    services = Service.objects.all()
    return render(request, 'booking/service_list.html', {'services': services})


@login_required
def book_service(request, service_id):
    service = get_object_or_404(Service, id=service_id)
    if request.method == 'POST':
        booking = Booking.objects.create(
            user=request.user,
            service=service,
            date=request.POST['date'],
            time=request.POST['time'],
        )
        return redirect('booking confirmation', booking_id=booking.id)
    return render(request, 'book_service.html', {'service': service})

def booking_confirmation(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    return render(request, 'booking_confirmation.html', {'booking': booking})
