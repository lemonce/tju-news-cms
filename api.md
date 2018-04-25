the api of tju
===========================

# service

## GET /api/tju/service/administrator?name=string
获取管理员列表

## DELETE /api/tju/service/administrator/:administratorId
删除某一个管理员

## POST /api/tju/service/article
创建一个文章
```
{
    title: string
    content: string
    abstract: string
    thumbnail: string
}
```

## GET /api/tju/service/article?keyword=string
查找文章列表

## GET /api/tju/service/article/:articleId
查看某个文章的详细信息

## PUT /api/tju/service/article/:articleId
修改未发布文章的内容（发布状态，文章内容）

## DELETE /api/tju/service/article/:articleId
删除某个文章（未发布的文章）

## POST /api/tju/service/catagory
创建一个分类
```
{
    name: string,
    active: boolean
}
```

## GET /api/tju/service/catagory?name=string&active=boolean
获取分类列表

## GET /api/tju/service/catagory/:catagoryId
查询某个分类的详细信息

## PUT /api/tju/service/catagory/:catagoryId
```
{
    active: boolean
}
```
修改某个分类的使用状态（激活或者冻结）

## POST /api/tju/service/article/:articleId/catagory/:catagoryId
```
{}
```
给文章一个分类

## DELETE /api/tju/service/article/:articleId/catagory/:catagoryId
将某个文章删除分类

# app

## GET /api/tju/app/article?keyword=string
获取已发布文章列表

## GET /api/tju/app/article/:articleId
获取某个文章详细信息

## GET /api/tju/app/article/:articleId/content
获取某个文章的内容

## GET /api/tju/app/catagory
获取分类列表

## GET /api/tju/app/catagory/:catagoryId/article
获取某个分类的文章列表

