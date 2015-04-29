[Ghost](https://github.com/TryGhost/Ghost)
==========================================

原来的Ghost博客版本为0.5.1，现在Ghost博客已经升级到0.5.10，新版本的Ghost相对于原来的版本有了很多的新功能，包括标签编辑、SEO等多个选项，新的特性是吸引人的，因此我也觉得升级我的博客到最新的0.5.10。

###1.数据备份 Ghost的所有数据都存在`/content`下，`/content/data`下为数据库文件，`/content/images`下为所有的图片文件，`/content/themes`下为主题文件，将这些文件备份。

此外根目录下的`config.js`是博客的配置文件，因此也需要备份。 ###2.主题替换 此前博客使用的是Ghost 0.5.1，主题也是挺不错的，而且还是响应式的。

但是旧的主题的功能相对较少，页面比较单一，没有边栏，无法添加标签云等功能，这也是我要升级的重要原因之一。

新的主题同样是使用了Bootstrap，也是响应式的，但是多了边栏和简单的主题设定。

###3.新功能添加 Ghost提供了许多API，可以利用这些API实现博客的定制，下面就列举出我主要添加的功能。 ####3.1.标签云（tag cloud）

**添加helper**：`/core/server/helpers/`新增`tag_cloud.js`

```javascript
var _               = require('lodash'),
    template        = require('./template'),
    config          = require('../config'),
    api             = require('../api'),
    tag_cloud;

tag_cloud = function (options) {
    var tagCloudOptions = (options || {}).hash || {};
    var limit = (_.has(tagCloudOptions, 'limit') && !/all/i.test(tagCloudOptions.limit))? parseInt(tagCloudOptions.limit, 10) : 'all';

    tagCloudOptions = _.pick(tagCloudOptions, ['limit']);
    tagCloudOptions = {
        limit: 'all',
        include: ['post_count'].join(','),
        context: 'internal'
    };

    return api.tags.browse(tagCloudOptions).then(function(tags){
        var sortedTags = _.sortBy(tags.tags, 'post_count').reverse();

        if(limit !== 'all') {
            sortedTags = sortedTags.slice(0, limit);
        }

        sortedTags.forEach(function(){
            this.url = config.urlFor('tag', {tag: this}, false);
        });

        return template.execute('tag_cloud',  {tags:sortedTags});
    });
};

module.exports = tag_cloud;
```

**添加模板**：`/core/server/helpers/tpl/`新增`tag_cloud.hbs`

```handlebar
<ul class="content tag-cloud">
    {{#foreach tags}}
    <a href="{{url}}" class="tag-item">{{name}}<span class="post-count">{{post_count}}</span></a>
    {{/foreach}}
</ul>
```

**注册helper**：`/core/server/helpers/index.js`注册helper

```javascript
//第40行
coreHelpers.tag_cloud = require('./tag_cloud');

//第113行（Async theme helpers后面）
registerAsyncThemeHelper('tag_cloud', coreHelpers.tag_cloud);
```

**使用**：只需要在适当的位置添加如下代码，可以设定`limit`值限定标签个数

```handlebar
{{tag_cloud limit="all"}}
```

**注意**：模板可以在主题目录下的`partials`里面重写覆盖。后面的例子也是如此。

####3.2.最近文章（recent posts）

**添加helper**：`/core/server/helpers/`新增`recent_posts.js`

```javascript
var _               = require('lodash'),
    template        = require('./template'),
    config          = require('../config'),
    api             = require('../api'),
    recent_posts;

recent_posts = function (options) {
    var recentPostsOptions = (options || {}).hash || {}, limit;
    if(_.has(recentPostsOptions, 'limit')){
        limit = parseInt(recentPostsOptions.limit, 10);
    } else {
        limit = 3;
    }

    recentPostsOptions = {
        limit: limit
    };

    return api.posts.browse(recentPostsOptions).then(function(posts){
        return template.execute('recent_posts',  {posts: posts.posts});
    });
};

module.exports = recent_posts;
```

**添加模板**：`/core/server/helpers/tpl/`新增`recent_posts.hbs`

```handlebar
<div class="content recent-post">
    {{#foreach posts}}
    <div class="recent-single-post">
        <a href="{{url}}" class="post-title">{{title}}</a>
        <div class="date">{{date format="MMMM DD, YYYY"}}</div>
    </div>
    {{/foreach}}
</div>
```

**注册helper**：`/core/server/helpers/index.js`注册helper

```javascript
//第41行
coreHelpers.recent_posts = require('./recent_posts');

//第114行（Async theme helpers后面）
registerAsyncThemeHelper('recent_posts', coreHelpers.recent_posts);
```

**使用**：只需要在适当的位置添加如下代码，可以设定`limit`值限定文章数目，默认3篇

```handlebar
{{recent_posts}}
```

####3.3.关键字（meta keywords） 这个helper主要是用于SEO，可以将文章标签放到meta头部的keywos中。

**添加helper**：`/core/server/helpers/`新增`meta_keywords.js`

```javascript
var _           = require('lodash'),
    config      = require('../config'),
    filters     = require('../filters'),
    meta_keywords;

meta_keywords = function () {
    var keywords,
        blog;

    if (_.isString(this.relativeUrl)) {
        blog = config.theme;
        if (!this.relativeUrl || this.relativeUrl === '/' || this.relativeUrl === '' || this.relativeUrl.match(/\/page/)) {
            keywords = blog.title;
        } else {
            keywords="";
            if (this.post && this.post.tags) {
                this.post.tags.forEach(function(value) {
                    if (!keywords=="") {
                        keywords+=",";
                    }
                    keywords+=value.name;
                });
                keywords+=","+blog.title;
            }
        }
    }
    return filters.doFilter('meta_keywords', keywords).then(function (keywords) {
        keywords = keywords || "";
        return keywords.trim();
    });
};

module.exports = meta_keywords;
```

**注册helper**：`/core/server/helpers/index.js`注册helper

```javascript
//第42行
coreHelpers.meta_keywords = require('./meta_keywords');

//第115行（Async theme helpers后面）
registerAsyncThemeHelper('meta_keywords', coreHelpers.meta_keywords);
```

**使用**：固定如下代码

```handlebar
<meta name="keywords" content="{{meta_keywords}}">
```

####3.4.上下篇链接`core/server/controllers/frontpage.js`的`single`方法对应的就是获取单篇博文内容。

第384行附近添加`next`和`previous`

```javscript
postLookup.include = 'author,tags,fields,next,previous';
```

修改主题下的`post.hbs`模板，在适当位置增加链接

```handlebar
<nav class="row">
    {{#if previous}}
     <div class="col-md-6">
         <a href="{{previous.url}}" title="Previous Post"><i class="fa fa-chevron-left"></i> {{previous.title}}</a>
     </div>
     {{/if}}
      {{#if next}}
      <div class="col-md-6" style="text-align:right; float: right">
           <a href="{{next.url}}" title="Previous Post">{{next.title}} <i class="fa fa-chevron-right"></i></a>
       </div>
      {{/if}}
</nav>
```

####3.5.归档（archives） 简单的按时间顺序列出博文。

先在`/core/server/routes/frontend.js`中添加路由，然后在`/core/server/controllers/frontend.js`添加处理函数。

代码略。

####3.6.联系（contact） 主要用于联系页面，发送消息到我的邮箱

也是先添加路由，再添加处理函数，这里用到了[nodemailer](https://github.com/andris9/Nodemailer)模块。

具体代码略。

####3.7.目录 添加目录

####3.8.文章音乐 文章中添加163音乐

###4.优化**页面加载优化**：之前用到多个css和js文件，合并了css和js，之前最近文章和标签云是通过`/rss`来获取，明显加载有延时，将这部分功能移到后台，最近文章和标签云的加载速度明显加快。通过Chrome DevTools的Network看出页面重新加载速度由4s变为了不到2s，好的情况下只有1s。

**为部分标签（tags）添加图标**：选取了部分图片，使用Photoshop简单处理图片,得到了几个常用的100\*100的图标。

**SEO**：google webmaster中重新添加sitemap，并手动添加博文链接，同时通过ghost的新功能手动为博文添加meta\_title和meta\_description。此外前文提到的为文章添加关键字（meta_keywords）也是SEO的操作之一。

至此新博客的迁移升级全部完成，后续工作就是进行优化。
