namespace BackEndApis.Services
{
    public class ServicesContex
    {
        public ServicesContex(AccountServices accountServices, LoginServices loginServices, AdminServices adminServices)
        {
            AccountServices = accountServices;
            LoginServices = loginServices;
            AdminServices = adminServices;
        }

        public AccountServices AccountServices { get; }
        public LoginServices LoginServices { get; }

        public AdminServices AdminServices { get; }
    }
}
