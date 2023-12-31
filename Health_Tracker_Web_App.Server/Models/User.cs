using System;
using System.Collections.Generic;

namespace Health_Tracker_Web_App.Server.Models;

public partial class User
{
    public int Users_id { get; set; }

    public string Uuid { get; set; } = null!;

}
