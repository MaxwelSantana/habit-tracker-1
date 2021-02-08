import moment from 'moment';
import 'moment/locale/en-ie';
import 'moment/locale/pt-br';

moment.updateLocale('pt-br', {
    longDateFormat: {
        LL: 'D [de] MMMM',
    },    
});

moment.locale('pt-br');

export default moment;
