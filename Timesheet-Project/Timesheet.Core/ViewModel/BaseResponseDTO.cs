﻿using System.Text.Json;

namespace Timesheet.Core.ViewModel
{
    public class BaseResponseDTO
    {
        public bool IsSuccess { get; set; }
        public string[] Errors { get; set; }

        public int StatusCode { get; set; }
        public string? Message { get; set; }
        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
