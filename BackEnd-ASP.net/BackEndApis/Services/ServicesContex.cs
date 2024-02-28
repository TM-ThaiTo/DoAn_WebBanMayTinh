namespace BackEndApis.Services
{
    public class ServicesContex
    {
        public ServicesContex(AccountServices accountServices, LoginServices loginServices)
        {
            AccountServices = accountServices;
            LoginServices = loginServices;
        }

        public AccountServices AccountServices { get; }
        public LoginServices LoginServices { get; }
    }
}
