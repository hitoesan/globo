var builder = WebApplication.CreateBuilder(args);

/*
    dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 6.* //Entity para SQLite
    dotnet add package Microsoft.EntityFrameworkCore.Design --version 6.* //Para uso de migrations
    dotnet ef migrations add nomeMigration //Adiciona nova migration na pasta Migrations
    dotnet ef database update //Aplica migration ao banco
    dotnet run //Para executar

    1. Criar entity com as colunas
    2. Criar DbContext com as configurações de banco e tabela entity
    3. Criar migration
    4. Aplicar migration

    Boas práticas:
    1. Converter entity para DTO (data transfer object) na API para envio
    2. No front, deve-se converter de DTO para 'house' type

    Injestão de depenência:
    1. Deve-se haver separação de concerns -> Models/Entities que determinam tipos de coluna no banco devem ser usados apenas
    para acesso ao banco e não devem ser usados para enviar dados; Devem ser utilizados apenas dentro da API e não devem ser
    expostos na rota
*/

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(); // Adicionando permissão para requisições da url do front
// Injestão de dependência - Instância do banco de dados
// Utiliza scoped scope - Cria nova instância para cada chamada de API
// Desliga tracking de mudanças já que o banco será constantemente recriado
builder.Services.AddDbContext<HouseDbContext>(o => o.UseQueryTrackingBehavior(Microsoft.EntityFrameworkCore.QueryTrackingBehavior.NoTracking));
builder.Services.AddScoped<IHouseRepository, HouseRepository>(); // Injestão de dependência


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(p => p.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod()); // Adicionando permissão para requisições da url do front
app.UseHttpsRedirection();

// Acessa o DbSet de 'houses'
// Retorna todas as entidades houses e serializa automaticamente em JSON

// Retorna model da tabela diretamente
//app.MapGet("/houses", (HouseDbContext dbContext) => dbContext.Houses); 

// Utiliza DTO, mas utiliza classe com conexão direta ao banco num arquivo responsável por setar os endpoints da API
// Deve-se separar os endpoints da conexão ao banco (separation of concerns)
//app.MapGet("/houses", (HouseDbContext dbContext) => dbContext.Houses.Select(h => new HouseDto(h.Id, h.Address, h.Country, h.Price))); 
app.MapGet("/houses", (IHouseRepository repo) => repo.GetAll()).Produces<HouseDetailDto[]>(StatusCodes.Status200OK); //Utilizando injestão de dependência
app.MapGet("/houses/{houseId:int}", async (int houseId, IHouseRepository repo) => {
    var house = await repo.Get(houseId);
    if (house == null)
        return Results.Problem($"House with ID {houseId} not found.", statusCode: 404);
    return Results.Ok(house);
}).ProducesProblem(404).Produces<HouseDetailDto>(StatusCodes.Status200OK);  // Setando tipos de retorno



app.Run();

