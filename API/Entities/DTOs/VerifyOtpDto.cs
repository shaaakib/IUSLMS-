﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class VerifyOtpDto
    {
        public string? PhoneNumber { get; set; }
        public string? Otp { get; set; }
    }
}
