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
    public class VendorsController : ControllerBase
    {
        private readonly TempahDbContext _context;

        public VendorsController(TempahDbContext context)
        {
            _context = context;
        }

        // GET: api/Vendors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vendor>>> GetVendors()
        {
          if (_context.Vendors == null)
          {
              return NotFound();
          }
            return await _context.Vendors.ToListAsync();
        }

        [HttpGet("vendor")]
        public async Task<ActionResult<IEnumerable<UvwVendorDetail>>> GetServicesByVendor(int vendorId)
        {
            if (_context.UvwVendorDetails == null)
            {
                return NotFound();
            }
            return await _context.UvwVendorDetails.Where(x => x.VendorId == vendorId).ToListAsync();
        }

        // GET: api/Vendors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vendor>> GetVendor(int id)
        {
          if (_context.Vendors == null)
          {
              return NotFound();
          }
            var vendor = await _context.Vendors.FindAsync(id);

            if (vendor == null)
            {
                return NotFound();
            }

            return vendor;
        }

        // PUT: api/Vendors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVendor(int id, Vendor vendor)
        {
            if (id != vendor.VendorId)
            {
                return BadRequest();
            }

            _context.Entry(vendor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendorExists(id))
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

        // POST: api/Vendors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Vendor>> PostVendor(Vendor vendor)
        //{
        //  if (_context.Vendors == null)
        //  {
        //      return Problem("Entity set 'TempahDbContext.Vendors'  is null.");
        //  }
        //    _context.Vendors.Add(vendor);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetVendor", new { id = vendor.VendorId }, vendor);
        //}

        [HttpPost]
        public async Task<IActionResult> UploadVendorImage([FromForm] Vendor vendor, [FromForm(Name = "file")] IFormFile file)
        {
            if (file == null)
            {
                return BadRequest("No file was provided.");
            }

            try
            {
                // Ensure the images directory exists
                var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\images");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                // Generate the file name using VendorId and original file name
                var originalFileName = file.FileName;
                var fileName = $"{vendor.VendorId}_{originalFileName}";  // Assuming vendor.VendorId is already available
                var filePath = Path.Combine(directoryPath, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    // Copy file to the server
                    await file.CopyToAsync(fileStream);

                    // Save vendor data with image path
                    vendor.ImagePath = $"/images/{fileName}"; // Image URL to serve from wwwroot/images
                    vendor.CreatedAt = DateTime.Now; // Set creation date if necessary

                    _context.Vendors.Add(vendor);  // Add new vendor record
                    await _context.SaveChangesAsync();  // Save changes

                    return Ok(new { vendor = vendor, message = "Vendor added successfully!" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateVendor(int id, [FromForm] Vendor vendor, [FromForm(Name = "file")] IFormFile? file)
        //{
        //    if (id != vendor.VendorId)
        //    {
        //        return BadRequest("Vendor ID mismatch.");
        //    }

        //    var existingVendor = await _context.Vendors.FindAsync(id);
        //    if (existingVendor == null)
        //    {
        //        return NotFound("Vendor not found.");
        //    }

        //    try
        //    {
        //        // Update vendor properties
        //        existingVendor.VendorName = vendor.VendorName;
        //        existingVendor.Address = vendor.Address;
        //        existingVendor.City = vendor.City;
        //        existingVendor.PhoneNumber = vendor.PhoneNumber;
        //        existingVendor.Email = vendor.Email;
        //        existingVendor.IsActive = vendor.IsActive;
        //        existingVendor.StateId = vendor.StateId;
        //        existingVendor.UserId = vendor.UserId;
        //        existingVendor.Rating = vendor.Rating;

        //        if (file != null)
        //        {
        //            // Ensure the images directory exists
        //            var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\images");
        //            if (!Directory.Exists(directoryPath))
        //            {
        //                Directory.CreateDirectory(directoryPath);
        //            }

        //            // Generate the file name using VendorId and original file name
        //            var originalFileName = file.FileName;
        //            var fileName = $"{vendor.VendorId}_{originalFileName}";
        //            var filePath = Path.Combine(directoryPath, fileName);

        //            // Save the new file
        //            using (var fileStream = new FileStream(filePath, FileMode.Create))
        //            {
        //                await file.CopyToAsync(fileStream);
        //            }

        //            // Delete the old image file if it exists
        //            if (!string.IsNullOrEmpty(existingVendor.ImagePath))
        //            {
        //                var oldFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", existingVendor.ImagePath.TrimStart('/'));
        //                if (System.IO.File.Exists(oldFilePath))
        //                {
        //                    System.IO.File.Delete(oldFilePath);
        //                }
        //            }

        //            // Update image path
        //            existingVendor.ImagePath = $"/images/{fileName}";
        //        }

        //        await _context.SaveChangesAsync();

        //        return Ok(new { vendor = existingVendor, message = "Vendor updated successfully!" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }
        //}




        // DELETE: api/Vendors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendor(int id)
        {
            if (_context.Vendors == null)
            {
                return NotFound();
            }
            var vendor = await _context.Vendors.FindAsync(id);
            if (vendor == null)
            {
                return NotFound();
            }

            _context.Vendors.Remove(vendor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VendorExists(int id)
        {
            return (_context.Vendors?.Any(e => e.VendorId == id)).GetValueOrDefault();
        }
    }
}
