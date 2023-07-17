using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Timesheet.Data.Migrations
{
    public partial class updatedatabasecolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AddedOn",
                table: "Project",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "AddedOn",
                table: "Employee",
                newName: "CreatedOn");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Project",
                newName: "AddedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Employee",
                newName: "AddedOn");
        }
    }
}
