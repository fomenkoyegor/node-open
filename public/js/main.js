class Ajax {
    constructor(url) {
        this.url = url
    }

    static createUrl(params) {
        if (params) {
            let url = '';
            for (let key in params) {
                url += `${key}=${params[key]}&`
            }
            return url;
        }
        return '';
    }

    async get(params = {}) {
        let paramsUrl = Ajax.createUrl(params);
        try {
            const res = await fetch(`${this.url}?${paramsUrl}`);
            return res.json();
        } catch (e) {
            throw new Error(e)
        }
    }


    async post(data = {}, params = '') {
        let paramsUrl = Ajax.createUrl(params);
        try {
            const res = await fetch(`${this.url}?${paramsUrl}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlQHJlLnJlMSIsInVzZXJJZCI6IjVkOWY1ZWZkOGU5YzQwMDBhODZjOTVmNiIsImlhdCI6MTU3MDczOTI3NCwiZXhwIjoxNTcwNzQyODc0fQ.AyF4wD1pLZ-SNXIIfMb_jOW6NpTOdWpZ3v-KVcbRnQg'
                }
            });
            return res.json();
        } catch (e) {
            throw new Error(e)
        }
    }

    async patch(id, data = {}, params = '') {
        let paramsUrl = Ajax.createUrl(params);
        try {
            const res = await fetch(`${this.url}${id}?${paramsUrl}`, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlQHJlLnJlMSIsInVzZXJJZCI6IjVkOWY1ZWZkOGU5YzQwMDBhODZjOTVmNiIsImlhdCI6MTU3MDczOTI3NCwiZXhwIjoxNTcwNzQyODc0fQ.AyF4wD1pLZ-SNXIIfMb_jOW6NpTOdWpZ3v-KVcbRnQg'
                }
            });
            return res.json();
        } catch (e) {
            throw new Error(e)
        }
    }

    async delete(id, data = {}, params = '') {
        let paramsUrl = Ajax.createUrl(params);
        try {
            const res = await fetch(`${this.url}${id}?${paramsUrl}`, {
                method: 'DELETE',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlQHJlLnJlMSIsInVzZXJJZCI6IjVkOWY1ZWZkOGU5YzQwMDBhODZjOTVmNiIsImlhdCI6MTU3MDczOTI3NCwiZXhwIjoxNTcwNzQyODc0fQ.AyF4wD1pLZ-SNXIIfMb_jOW6NpTOdWpZ3v-KVcbRnQg'
                }
            });
            return res.json();
        } catch (e) {
            throw new Error(e)
        }
    }
}

class PostsService extends Ajax {
    constructor() {
        super('/api/posts/')
    }

}

const postsService = new PostsService();


var app = new Vue({
    el: '#app',
    data: {
        message: 'Привет, Vue!',
        posts: [],
        post: {
            title: null,
            body: null
        }
    },
    mounted() {
        this.onGetPosts()
    },
    methods: {
        onGetPosts() {
            postsService.get().then(res => {
                this.posts = res.data
            });
        },
        onCreatePost() {
            postsService.post(this.post).then(post => {
                this.posts.unshift(post)
            });
        },
        checkFormPost(e) {
            e.preventDefault();
            if (this.post.title.trim() && this.post.body.trim()) {
                this.onCreatePost(this.post);
            }
        },
        onDelete(id) {
            postsService.delete(id).then(data => {
                this.posts = this.posts.filter(post => post._id !== data.post._id)
            })
        }
    }
});
