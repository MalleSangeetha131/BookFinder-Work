using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Linq;
using System.Reflection;
using System;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;

namespace dotnetapp.Tests
{
    [TestFixture]
    public class Tests
    {

 [Test, Order(1)]
public async Task Backend_Test_Method_GetBookById_In_BookService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.BookService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetBookById method
            MethodInfo getBookByIdMethod = serviceType.GetMethod("GetBookById");

            if (getBookByIdMethod != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}

 [Test, Order(2)]
public async Task Backend_Test_Method_GetAllBooks_In_BookService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.BookService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetBookById method
            MethodInfo Method = serviceType.GetMethod("GetAllBooks");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
 [Test, Order(3)]
public async Task Backend_Test_Method_AddBook_In_BookService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.BookService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetBookById method
            MethodInfo Method = serviceType.GetMethod("AddBook");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
 [Test, Order(4)]
public async Task Backend_Test_Method_UpdateBook_In_BookService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.BookService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetBookById method
            MethodInfo Method = serviceType.GetMethod("UpdateBook");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}

 [Test, Order(5)]
public async Task Backend_Test_Method_DeleteBook_In_BookService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.BookService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetBookById method
            MethodInfo Method = serviceType.GetMethod("DeleteBook");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    
 [Test, Order(6)]
public async Task Backend_Test_Method_GetAllBooks_In_BookController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.BookController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetBookById method
            MethodInfo Method = serviceType.GetMethod("GetAllBooks");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(7)]
public async Task Backend_Test_Method_GetBookById_In_BookController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.BookController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetBookById method
            MethodInfo Method = serviceType.GetMethod("GetBookById");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(8)]
public async Task Backend_Test_Method_AddBook_In_BookController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.BookController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetBookById method
            MethodInfo Method = serviceType.GetMethod("AddBook");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(9)]
public async Task Backend_Test_Method_UpdateBook_In_BookController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.BookController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetBookById method
            MethodInfo Method = serviceType.GetMethod("UpdateBook");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(10)]
public async Task Backend_Test_Method_DeleteBook_In_BookController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.BookController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetBookById method
            MethodInfo Method = serviceType.GetMethod("DeleteBook");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(11)]
public async Task Backend_Test_Method_Login_In_AuthenticationController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.AuthenticationController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetBookById method
            MethodInfo Method = serviceType.GetMethod("Login");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(12)]
public async Task Backend_Test_Method_Register_In_AuthenticationController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.AuthenticationController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetBookById method
            MethodInfo Method = serviceType.GetMethod("Register");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    
}
}

