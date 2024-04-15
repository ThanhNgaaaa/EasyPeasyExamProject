using EasyPeasyExam.Models;
using EasyPeasyExam.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EasyPeasyExam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamResultsController : ControllerBase
    {
        private readonly EasyPeasyExamContext _context;
        private readonly ICacheService _cacheService;

        public ExamResultsController(EasyPeasyExamContext context, ICacheService cacheService)
        {
            _context = context;
            _cacheService = cacheService;
        }

        // GET: api/ExamResult
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExamResult>>> GetExamResult()
        {
            if (_context.ExamResults == null)
            {
                return NotFound();
            }
            return await _context.ExamResults.ToListAsync();
        }

        //GET: apiExamResult/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExamResult>> GetExamResult(int id)
        {
            if (_context.ExamResults == null)
            {
                return NotFound();
            }
            var examResult = await _context.ExamResults.FindAsync(id);

            if (examResult == null)
            {
                return NotFound();
            }

            return examResult;
        }

        // PUT:
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExamResult(int id, ExamResult examResult)
        {
            if (id != examResult.ResultId)
            {
                return BadRequest();
            }

            _context.Entry(examResult).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExamResultExists(id))
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

        // POST: 
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ExamResult>> PostExamResult(ExamResult examResult)
        {
            if (_context.ExamResults == null)
            {
                return Problem("Entity set 'EasyPeasyExamContext.ExamResult  is null.");
            }
            var cacheKey = $"result_{examResult.StudentId}_{examResult.ExamId}";
            var cachedResult = _cacheService.GetData<ExamResult>(cacheKey);
            if (cachedResult != null)
            {
                return CreatedAtAction("GetExamResult", new { id = cachedResult.ResultId }, cachedResult);
            }
            _context.ExamResults.Add(examResult);
            await _context.SaveChangesAsync();
            var expiryTime = DateTimeOffset.Now.AddMinutes(1);
            _cacheService.SetData(cacheKey, examResult, expiryTime);

            return CreatedAtAction("GetExamResult", new { id =examResult.ResultId }, examResult);
        }

        // DELETE: 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExamResult(int id)
        {
            if (_context.ExamResults == null)
            {
                return NotFound();
            }
            var examResult = await _context.ExamResults.FindAsync(id);
            if (examResult == null)
            {
                return NotFound();
            }

            _context.ExamResults.Remove(examResult);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool ExamResultExists(int id)
        {
            return (_context.ExamResults?.Any(e => e.ResultId == id)).GetValueOrDefault();
        }
    }
}
