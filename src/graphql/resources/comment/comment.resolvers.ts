import { Dbconnection } from '../../../interfaces/DbConnectionInterface';
import { GraphQLResolveInfo } from 'graphql';
import { Transaction } from 'sequelize';
import { handleError } from '../../../utils/utils';

export const commentResolvers = {

    Comment:{
        user: (	parent,	{ first = 10, offset = 10, post },{ db }: { db: Dbconnection },	info: GraphQLResolveInfo) => {
			return db.User.findById(parent.get('user')).catch(handleError);
        },
        post: (	parent,	{ first = 10, offset = 10, post },{ db }: { db: Dbconnection },	info: GraphQLResolveInfo) => {
			return db.Post.findById(parent.get('post')).catch(handleError);
        },        
    },
	Query: {
		commentsByPost: (parent,{ first = 10, offset = 10, post },	{ db }: { db: Dbconnection },info: GraphQLResolveInfo) => {
			return db.Comment.findAll({
				where: { post: post },
				limit: first,
				offset: offset
			}).catch(handleError);
		}
	},
	Mutation: {
		createComment: (parent, { input }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			return db.sequelize.transaction((t: Transaction) => {
				return db.Comment.create(input, { transaction: t });
			}).catch(handleError);
		},
		updateComment: (parent, { id, input }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			id = parseInt(id);
			return db.sequelize.transaction((t: Transaction) => {
				return db.Comment.findById(id).then((post) => {
					if (!post) throw new Error(`Comment with id ${id} not found!`);
					return post.update(input, { transaction: t });
				});
			}).catch(handleError);
		},
		deleteComment: (parent, { id }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			id = parseInt(id);
			return db.sequelize.transaction((t: Transaction) => {
				return db.Comment.findById(id).then((post) => {
					if (!post) throw new Error(`Comment with id ${id} not found!`);
					return post.destroy({ transaction: t }).then((post) => {
						post;
					});
				});
			}).catch(handleError);
		}
	}
};
