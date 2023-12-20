using System;
using System.Collections.Generic;

namespace Health_Tracker_Web_App.Server.Models;

public partial class Food
{
    public int Food_id { get; set; }

    public string Name { get; set; } = null!;

    public int Fat { get; set; }

    public int Carbs { get; set; }

    public int Protein { get; set; }

    public int Calories { get; set; }

    public int Users_id { get; set; }
}
