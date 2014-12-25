﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace App.Models
{
    public class Account : BaseEntity
    {
        public override long ID { get; set; }
        public String Code { get; set; }
        public String Name { get; set; }
        public AccountType Type { get; set; }
        public ExpenseType? ExpenseType { get; set; }
        public ExpenseGroup? ExpenseGroup { get; set; }
        public decimal? Target { get; set; }
        public bool IsActivated { get; set; }

        [ForeignKey("ParentAccount")]
        public long? fkParentAccountID { get; set; }
        public virtual Account ParentAccount { get; set; }
        
        [ForeignKey("APBDes")]
        public long fkAPBDesID { get; set; }
        public virtual APBDes APBDes { get; set; }


        public String ParentCode
        {
            get
            {
                if (!Code.Contains('.'))
                    return null;
                return Code.Substring(0, Code.LastIndexOf('.'));
            }
        }
    }
}