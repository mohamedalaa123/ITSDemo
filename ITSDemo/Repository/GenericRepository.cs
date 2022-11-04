using ITSDemo.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ITSDemo.Repository
{
    public class GenericRepository<T> : IRepository<T> where T : class
    {
        private CustomerContext _ApplicationDbContext;
        public GenericRepository(CustomerContext _applicationDbContext)
        {
            _ApplicationDbContext = _applicationDbContext;
        }
        public T Create(T entity)
        {
            _ApplicationDbContext.Set<T>().Add(entity);
            _ApplicationDbContext.SaveChanges();

            return entity;
        }

        public void Delete(T entity)
        {
            _ApplicationDbContext.Set<T>().Remove(entity);
            _ApplicationDbContext.SaveChanges();

        }

        public IQueryable<T> FindAll()
        {
            return _ApplicationDbContext.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return _ApplicationDbContext.Set<T>().Where(expression).AsNoTracking();
        }

        public void save()
        {
            _ApplicationDbContext.SaveChanges();
        }

        public void Update(T entity)
        {
            _ApplicationDbContext.Entry(entity).State = EntityState.Modified;
            _ApplicationDbContext.Set<T>().Update(entity);
            _ApplicationDbContext.SaveChanges();

        }
    }
}
