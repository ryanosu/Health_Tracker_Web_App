using System;
using System.Collections.Generic;

namespace Health_Tracker_Web_App.Server.Models;

public partial class Food
{
    public int Food_id { get; set; }

    public string Name { get; set; } = null!;

    public double Fat { get; set; }

    public double Carbs { get; set; }

    public double Protein { get; set; }

    public double Calories { get; set; }

    public int Users_id { get; set; }

    public string? Date { get; set; } = null!;
}
