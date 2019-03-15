export default {
    store ,
    router ,
    data () {
        return {

        };
    } ,

    methods: {
        getClass (v) {
            return v ? 'error' : '';
        } ,
        logout () {
            logout();
        } ,
    } ,
    components: {

    }
};