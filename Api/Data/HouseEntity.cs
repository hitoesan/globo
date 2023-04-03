// Entities são classes modeladas em cima das tabelas e colunas do banco de dados
// Entities são usadas em uma classe chamada de database context
public class HouseEntity {
    public int Id { get; set; }
    public string? Address { get; set; }
    public string? Country { get; set; }
    public string? Description { get; set; }
    public int Price { get; set; }
    public string? Photo { get; set; }
}