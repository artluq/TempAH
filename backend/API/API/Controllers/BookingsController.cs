using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly TempahDbContext _context;

        public BookingsController(TempahDbContext context)
        {
            _context = context;
        }

        // GET: api/Bookings/user/3
        [HttpGet("api/Bookings/user/{userId}")]
        public async Task<ActionResult<IEnumerable<UvwBooking>>> GetBookingsByUserId(int userId)
        {
            if (_context.UvwBookings == null)
            {
                return NotFound();
            }

            var bookings = await _context.UvwBookings
                .Where(b => b.UserId == userId && (b.StatusId == 1 || b.StatusId == 2 || b.StatusId == 3 || b.StatusId == 7))
                .ToListAsync();

            if (bookings == null || bookings.Count == 0)
            {
                return NotFound($"No bookings found for user ID {userId}.");
            }

            return bookings;
        }

        // GET: api/Bookings/user/3
        [HttpGet("api/BookingsHistory/user/{userId}")]
        public async Task<ActionResult<IEnumerable<UvwBooking>>> GetBookingHistoryByUserId(int userId)
        {
            if (_context.UvwBookings == null)
            {
                return NotFound();
            }

            var bookings = await _context.UvwBookings
                 .Where(b => b.UserId == userId && (b.StatusId == 4 || b.StatusId == 5 || b.StatusId == 6))
                 .ToListAsync();

            if (bookings == null || bookings.Count == 0)
            {
                return NotFound($"No bookings found for user ID {userId}.");
            }

            return bookings;
        }


        // GET: api/Bookings/vendor/3
        [HttpGet("api/Bookings/vendor/{userId}")]
        public async Task<ActionResult<IEnumerable<UvwBooking>>> GetBookingsByVendorId(int userId)
        {
            if (_context.UvwBookings == null)
            {
                return NotFound();
            }

            var bookings = await _context.UvwBookings
                .Where(b => b.VendorId == userId)
                .ToListAsync();

            if (bookings == null || bookings.Count == 0)
            {
                return NotFound($"No bookings found for user ID {userId}.");
            }

            return bookings;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }
            return await _context.Bookings.ToListAsync();
        }

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UvwBooking>> GetBooking(int id)
        {
            if (_context.UvwBookings == null)
            {
                return NotFound();
            }

            var booking = await _context.UvwBookings.FirstOrDefaultAsync(x => x.BookingId == id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // PUT: api/Bookings/updateStatus/5
        [HttpPut("updateStatus/{id}")]
        public async Task<IActionResult> UpdateBookingStatus(int id)
        {
            // Check if the booking exists
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound($"Booking with ID {id} not found.");
            }

            // Update the StatusId to 5
            booking.StatusId = 5;

            // Save changes to the database
            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Bookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            if (id != booking.BookingId)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            if (_context.Bookings == null)
            {
                return Problem("Entity set 'TempahDbContext.Bookings'  is null.");
            }
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.BookingId }, booking);
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingExists(int id)
        {
            return (_context.Bookings?.Any(e => e.BookingId == id)).GetValueOrDefault();
        }
    }
}
