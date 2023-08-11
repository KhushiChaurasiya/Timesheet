using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Timesheet.Data.Migrations
{
    public partial class updateemp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Employee");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Employee",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }
    }
}
