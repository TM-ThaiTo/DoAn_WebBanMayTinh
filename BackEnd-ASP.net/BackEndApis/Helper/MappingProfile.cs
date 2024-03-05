using AutoMapper;
using static BackEndApis.Helper.Info;

namespace BackEndApis.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // map request add product => infoProduct
            CreateMap<Info.ProductRequestModel, InfoProduct>();

            // map request Desc => infoDesc
            CreateMap<Info.InfoDescModel, InfoDescModel>();

            // map request.details => InfoDetailsModel
            CreateMap<Info.InfoDetailsModel, InfodescPrvDetails>();
        }
    }
}
