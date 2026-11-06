import "./recipes";
import "@typespec/http";

using Http;

@service(#{ title: "Kitchen" })
@server("/kitchen")
namespace Kitchen;
