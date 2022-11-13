var property = require('nested-property');
var keyBy = require('lodash.keyby');
// терь вывести типы и эксперементровать уже тут 
function createTree(array, rootNodes, customID, childrenProperty) {
    // Создаеться массив дерева
    var tree = [];

    // rootNodes - это все корневые элементы с порядковым id === 0 которые будут размещены
    // в корне дерева
    for (var rootNode in rootNodes) {
        // берем корневой узел
        var node = rootNodes[rootNode];
        var childNode = array[node[customID]];

        if (!node && !rootNodes.hasOwnProperty(rootNode)) {
            continue;
        }

        if (childNode) {
            node[childrenProperty] = createTree(
                array,
                childNode,
                customID,
                childrenProperty
            );
        }

        tree.push(node);
    }

    return tree;
}
// принимает массив данных которые надо сгрупировтаь по родителю и опции
function groupByParents(array, options) {
    // Тут кароче масисив становиться местным аналогом асоциативных массивов где ключем становиться
    // одно из свойств объекта который явялеться элементом этого массива, в данном случае это _id
    var arrayByID = keyBy(array, options.customID);

    return array.reduce(function(prev, item) {
        // Получаем id родителя элемента
        // Скорее всего тут мне и надо делать распознавнаие элемнета что бы получить id его родителя
        // кстати вполне себе вариатн так как сам элемент тут тоже есть
        //TODO парсить по типу элемента скорее всего тут
        let parentProperty;
        // eslint-disable-next-line default-case
        switch (item.__typename) {
            case 'Folder':
            case 'Document':
            case 'TodoBox':
                parentProperty = options.parentProperty
                break
            case 'TodoBoard':
                parentProperty = 'parentTodoBoxId._id';
                break
        }
        var parentID = property.get(item, parentProperty);
        // Если у элемента нету parentID, или если нету элемента у которого _id === parentID

        if (!parentID || !arrayByID.hasOwnProperty(parentID)) {
            // присваиваем parentID значение rootID  который по умолчнаию у нас равен 0 (это скорее всего элементы
            // которые будут размещены в корне)
            parentID = options.rootID;
        }

        // Если parentID есть у элемента и в инициализировнаном значении уже есть объект с parentID ввиде ключа
        // то значит это будет не превый его ребенок и добавлем его в массив к остальныи
        if (parentID && prev.hasOwnProperty(parentID)) {
            // то создаем объект с parentID и добавляем туда элемент как дчоерний
            // и возвращаем этот объект
            prev[parentID].push(item);
            return prev;
        }

        // иначев инициализировнаном значении parentID будет вперве и значет ребенок у него будет тоже первым
        // и возможно единственным, а сесли нет то благодаря условию сверху сделаем из них массив
        prev[parentID] = [item];
        return prev;
    }, {});
}

function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}

//клонирование данных которые будут приображены в дерево (походу на оригинале они не работают ну ладно, так даже надежнее)
function deepClone(data) {
    //если данные это массив, до вызове на них метод map и передай туда рекурсивно deepClone
    // где он вернет значение обработав каждый элемент массива
    if (Array.isArray(data)) {
        return data.map(deepClone);
        // Если же это объект, то ...
    } else if (isObject(data)) {
        // получаем массив ключей этого объекта и вызываем на нем массив reduce
        return Object.keys(data).reduce(function(o, k) {
            // и тут вследствии задания initialValue как пустой объект
            // то в этот объест рпокидываеться элемент с именем из ранее созданного массива ключей
            // и значением из объекта
            // вот так и происходит рекрсивное копировнаие объекта п овсей длине
            o[k] = deepClone(data[k]);
            return o;
        }, {});
        // если не массив и не объект то верни как резольтутирующие значение
    } else {
        return data;
    }
}

/**
 * arrayToTree
 * Convert a plain array of nodes (with pointers to parent nodes) to a nested
 * data structure
 *
 * @name arrayToTree
 * @function
 *
 * @param {Array} data An array of data
 * @param {Object} options An object containing the following fields:
 *
 *  - `parentProperty` (String): A name of a property where a link to
 * a parent node could be found. Default: 'parent_id'
 *  - `customID` (String): An unique node identifier. Default: 'id'
 *  - `childrenProperty` (String): A name of a property where children nodes
 * are going to be stored. Default: 'children'.
 *
 * @return {Array} Result of transformation
 */

module.exports = function arrayToTree(data, options) {

    //сюда приходят массив с данными для парсинга и опции
    // значит надо сделать так что бы тут оно проверяло не конкретные свойства детей и родителей, а их мпссивы

    // тут опции по умоляанию
    options = Object.assign(
        {
            parentProperty: 'parent_id',
            childrenProperty: 'children',
            customID: 'id',
            rootID: '0'
        },
        options
    );

    if (!Array.isArray(data)) {
        throw new TypeError('Expected an array but got an invalid argument');
    }
    // тут идет групировка по родителям
    var grouped = groupByParents(deepClone(data), options);
    // и создаем дерево возвращая результат функции createTree (тут еще возможно есть еще и групировака по
    // детям а не только по родителям)

    return createTree(
        grouped,
        grouped[options.rootID],
        options.customID,
        options.childrenProperty
    );
};
