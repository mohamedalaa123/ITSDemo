namespace ITSDemo.Base
{
    public class GenericResponse<T> : BaseResponse
    {
        public T Data { get; set; }
    }
}
