/**
 * Description de la classe 
 *
 * @type Message
 * @class  Instance d'un Message
 *
 * Description du constructeur 
 *
 * @this {Message}
 * @description Constructeur de la classe Message
 *
 * Description des attributs
 *
 * @property idNetwork ID du reseau du message
 * @property idMsg ID du message
 * @property idAuthor ID de l'auteur
 * @property contMsg Contenu du message
 * @property linkMsg Lien vers le message original
 * @property dateMsg Date du message
 * @property listMedias Liste des medias attaches au message
 * @property localisation Localisation attachee au message
 * @property replyTo ID du message parent auquel le message repond
 */
function Message() {

	/* ID du reseau du message */
	this.idNetwork;
	/* ID du Message */
	this.idMsg;
	/* ID de l'auteur */
	this.idAuthor;
	/* Contenu du message */
	this.contMsg;
	/* Lien vers le message original */
	this.linkMsg;
	/* Date du message */
	this.dateMsg;
	/* Liste des medias attaches au message */
	this.listMedias;
	/* Localisation attachee au message */
	this.localisation;
	/* ID du message parent auquel le message repond */
	this.replyTo;
}

/**
 * Description de la classe
 *
 * @type Profil
 * @class  Instance d'un Profil
 *
 * Description du constructeur
 *
 * @this {Profil}
 * @description Constructeur de la classe Profil
 *
 * Description des attributs 
 *
 * @property idNetwork ID du reseau du profil
 * @property idProfil ID du profil
 * @property name Nom de l'utilisateur
 * @property firstName Prenom de l'utilisateur
 * @property nickName Surnom
 * @property description Description du profil
 * @property birthPlace Lieu de naissance
 * @property birthDate Date de naissance
 * @property lifePlace Lieu de vie
 * @property workPlace Lieu de travail (entreprise ou ecole
 * @property nbFriends Nombre d'amis
 * @property nbFollowers Nombre de Followers
 * @property nbFollows Nombre de Follows
 * @property nbMsg Nombre de Messages
 * @property inscriptionDate Date d'inscription
 */
function Profil() {
	/* ID du reseau du profil */
	this.idNetwork;
	/* ID du profil */
	this.idProfil;
	/* Nom de l'utilisateur */
	this.name;
	/* Prenom de l'utilisateur */
	this.firstName;
	/* Surnom */
	this.nickName;
	/* Description du profil */
	this.description;
	/* Lieu de naissance */
	this.birthPlace;
	/* Date de naissance */
	this.birthDate;
	/* Lieu de vie */
	this.lifePlace;
	/* Lieu de travail (entreprise ou ecole) */
	this.workPlace;
	/* Nombre d'amis */
	this.nbFriends;
	/* Nombre de Followers */
	this.nbFollowers;
	/* Nombre de Follows */
	this.nbFollows;
	/* Nombre de Messages */
	this.nbMsg;
	/* Date d'inscription */
	this.inscriptionDate;
}


/**
 * Description de la classe
 *
 * @type Recherche
 * @class  Instance d'une recherche
 *
 * Description du constructeur
 *
 * @this {Search}
 * @description Constructeur de la classe Recherche 
 *
 * Description des attributs
 *
 * @property typeSearch Type de recherche
 * @property contSearch Champ recherche
 * @property dateBegin Date de debut de la recherche
 * @property dateEnd Date de fin de la recherche
 * @property networks Reseau ou effectuer la recherche 
 *
 */
function Search() {
	/* Type de recherche */
	this.typeSearch;
	/* Champ recherche */
	this.contSearch;
	/* Date de debut de la recherche */
	this.dateBegin;
	/* Date de fin de la recherche */
	this.dateEnd;
	/* Reseau ou effectuer la recherche */
	this.networks;
}



