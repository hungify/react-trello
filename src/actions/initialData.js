export const initialData = {
  boards: [
    {
      id: 'board-1',
      columnOrder: ['column-3', 'column-2', 'column-1'],
      columns: [
        {
          id: 'column-1',
          boardId: 'board-1',
          title: 'Todo column',
          cardOrder: [
            'card-6',
            'card-2',
            'card-3',
            'card-4',
            'card-5',
            'card-1',
          ],
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 1',
              cover: null,
            },
            {
              id: 'card-2',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 2',
              cover: null,
            },
            {
              id: 'card-3',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 3',
              cover: null,
            },
            {
              id: 'card-5',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 5',
              cover: null,
            },
            {
              id: 'card-6',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 6',
              cover: null,
            },
          ],
        },
        {
          id: 'column-2',
          boardId: 'board-1',
          title: 'To do Progress',
          cardOrder: ['card-8', 'card-9', 'card-10'],
          cards: [
            {
              id: 'card-8',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 8',
              cover:
                'https://images.unsplash.com/photo-1634351395713-0deccec2378b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=736&q=80',
            },
            {
              id: 'card-9',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 9',
              cover: null,
            },
            {
              id: 'card-10',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 10',
              cover: null,
            },
          ],
        },
        {
          id: 'column-3',
          boardId: 'board-1',
          title: 'To do Done',
          cardOrder: ['card-11', 'card-12', 'card-13'],
          cards: [
            {
              id: 'card-11',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 11',
              cover: null,
            },
            {
              id: 'card-12',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 12',
              cover: null,
            },
            {
              id: 'card-13',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 13',
              cover: null,
            },
          ],
        },
      ],
    },
  ],
};
