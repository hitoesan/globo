using Microsoft.EntityFrameworkCore;

public class HouseDbContext : DbContext {

    public HouseDbContext(DbContextOptions<HouseDbContext> o) : base(o) {}

    // Representa as tabelas do banco cujas colunas estão definidas na Entity
    public DbSet<HouseEntity> Houses => Set<HouseEntity>();

    // Define que banco utilizar
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        optionsBuilder.UseSqlite($"Data Source={Path.Join(path, "houses.db")}");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        SeedData.Seed(modelBuilder);
    }
}