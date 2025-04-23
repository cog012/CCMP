const express = require('express')
const router = new express.Router
const { userRegister, userValidate, userAuth, userAuthPremium, userAuthAdmin, userInfoGet, userAliasUpdate, userEmailUpdate, userPasswordUpdate, userList, userListAdmin, userSuspend, userUnSuspend, objectUpload, objectUploadPremium, objectSetPremium, objectUnSetPremium, objectSuspend, objectUnSuspend, objectList, objectListPremium, objectListAdmin, tagCreate, tagSuspend, tagUnSuspend, tagList, tagListAdmin } = require('../sdk/mongo')


router.post('/userRegister', (req, res) => {
    if (!req.query.email || !req.query.password) return res.status(400).json({ message: 'email and password required' })
    const email = req.query.email
    const password = req.query.password
    userValidate({
        email: email
    }).then(isEmailAvailable => {
        if (isEmailAvailable == true) {
            userRegister({
                email: email,
                password: password
            }).then(isRegisterSuccess => {
                res.send({
                    isRegisterSuccess: isRegisterSuccess
                })
            })
        } else {
            res.send({
                isRegisterSuccess: false
            })
        }
    })
})

router.post('/userValidate', (req, res) => {
    if (!req.query.email) return res.status(400).json({ message: 'email required' })
    const email = req.query.email
    userValidate({
        email: email
    }).then(isEmailAvailable => {
        res.send({
            isEmailAvailable: isEmailAvailable
        })
    })
})

router.post('/userAuth', (req, res) => {
    if (!req.query.email || !req.query.password) return res.status(400).json({ message: 'email and password required' })
    const email = req.query.email
    const password = req.query.password
    userAuth({
        email: email,
        password: password
    }).then(isAuthenticated => {
        res.send({
            isAuthenticated: isAuthenticated
        })
    })
})

router.post('/userAuthPremium', (req, res) => {
    if (!req.query.user || !req.query.premiumToken) return res.status(400).json({ message: 'user/premiumToken required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const premiumToken = req.query.premiumToken
    userAuthPremium({ email: email, password: password, premiumToken: premiumToken })
        .then(isAuthenticated => {
            res.send({
                isAuthenticated: isAuthenticated
            })
        })
})

router.post('/userAuthAdmin', (req, res) => {
    if (!req.query.user || !req.query.adminToken) return res.status(400).json({ message: 'user/adminToken required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const adminToken = req.query.adminToken
    userAuthAdmin({ email: email, password: password, adminToken: adminToken })
        .then(isAuthenticated => {
            res.send({
                isAuthenticated: isAuthenticated
            })
        })
})

router.post('/userInfoGet', (req, res) => {
    if (!req.query.user) return res.status(400).json({ message: 'user required' })
    const email = req.query.user.email
    const password = req.query.user.password
    userInfoGet({
        email: email,
        password: password
    }).then(userInfo => {
        res.send({
            userInfo: userInfo
        })
    })
})

router.post('/userAliasUpdate', (req, res) => {
    if (!req.query.user || !req.query.newAlias) return res.status(400).json({ message: 'user/newAlias required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const newAlias = req.query.newAlias
    userAliasUpdate({
        email: email,
        password: password,
        newAlias: newAlias
    }).then(isModified => {
        res.send({
            isModified: isModified
        })
    })
})

router.post('/userEmailUpdate', (req, res) => {
    if (!req.query.user || !req.query.newEmail) return res.status(400).json({ message: 'user/newEmail required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const newEmail = req.query.newEmail
    userValidate({
        email: newEmail
    }).then(isEmailAvailable => {
        if (isEmailAvailable == true) {
            userEmailUpdate({
                email: email,
                password: password,
                newEmail: newEmail,
            }).then(isModified => {
                res.send({
                    isModified: isModified
                })
            })
        } else {
            res.send({
                isModified: false
            })
        }
    })
})

router.post('/userPasswordUpdate', (req, res) => {
    if (!req.query.user || !req.query.newPassword) return res.status(400).json({ message: 'user/newPassword required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const newPassword = req.query.newPassword
    userPasswordUpdate({
        email: email,
        password: password,
        newPassword: newPassword
    }).then(isModified => {
        res.send({
            isModified: isModified
        })
    })
})

router.post('/userList', (req, res) => {
    return res.status(400).json({ message: 'under developing' })
})

router.post('/userListAdmin', (req, res) => {
    if (!req.query.user || !req.query.admin) return res.status(400).json({ message: 'user/admin required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const adminToken = req.query.admin.adminToken
    userAuthAdmin({
        email: email,
        password: password,
        adminToken: adminToken
    }).then(isAuthenticated => {
        if (isAuthenticated == true) {
            userListAdmin({})
                .then(userArray => {
                    res.send({ userArray: userArray })
                })
        }
    })
})

router.post('/userSuspend', (req, res) => {
    if (!req.query.user || !req.query.admin || !req.query.targetUserId) return res.status.json({ message: 'user/admin/targetUserId required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const adminToken = req.query.admin.adminToken
    const targetUserId = req.query.targetUserId
    userAuthAdmin({
        email: email,
        password: password,
        adminToken: adminToken,
    }).then(isAuthenticated => {
        if (isAuthenticated == true) {
            userSuspend({
                targetUserId: targetUserId
            }).then(isModified => {
                res.send({
                    isModified: isModified
                })
            })
        }
    })
})

router.post('/userUnSuspend', (req, res) => {
    if (!req.query.user || !req.query.admin || !req.query.targetUserId) return res.status.json({ message: 'user/admin/targetUserId required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const adminToken = req.query.admin.adminToken
    const targetUserId = req.query.targetUserId
    userAuthAdmin({
        email: email,
        password: password,
        adminToken: adminToken,
    }).then(isAuthenticated => {
        if (isAuthenticated == true) {
            userUnSuspend({
                targetUserId: targetUserId
            }).then(isModified => {
                res.send({
                    isModified: isModified
                })
            })
        }
    })
})

router.post('/objectUpload', (req, res) => {
    if (!req.query.user || !req.query.category || !req.query.name || !req.query.description || !req.query.tagId) return res.status(400).json({ message: 'user/category/name/description/tagId required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const category = req.query.category
    const name = req.query.name
    const description = req.query.description
    const tagId = req.query.tagId
    console.log(req.query)
    objectUpload({ email: email, password: password, category: category, name: name, description: description, tagId: tagId })
        .then(newObjectId => {
            res.send({
                newObjectId: newObjectId
            })
        })
})

router.post('/objectUploadPremium', (req, res) => {
    if (!req.query.user || !req.query.category || !req.query.name || !req.query.description || !req.query.tagId) return res.status(400).json({ message: 'user/category/name/description/tagId required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const category = req.query.category
    const name = req.query.name
    const description = req.query.description
    const tagId = req.query.tagId
    console.log(req.query)
    objectUploadPremium({ email: email, password: password, category: category, name: name, description: description, tagId: tagId })
        .then(newObjectId => {
            res.send({
                newObjectId: newObjectId
            })
        })
})

router.post('/objectSetPremium', (req, res) => {
    if (!req.query.user || !req.query.admin || !req.query.targetObjectId) return res.status(400).json({ message: 'user/admin/targetObjectId required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const adminToken = req.query.admin.adminToken
    const targetObjectId = req.query.targetObjectId
    userAuthAdmin({
        email: email,
        password: password,
        adminToken: adminToken,
    }).then(isAuthenticated => {
        if (isAuthenticated == true) {
            objectSetPremium({
                targetObjectId: targetObjectId
            }).then(isModified => {
                res.send({
                    isModified: isModified
                })
            })
        }
    })
})

router.post('/objectUnSetPremium', (req, res) => {
    if (!req.query.user || !req.query.admin || !req.query.targetObjectId) return res.status(400).json({ message: 'user/admin/targetObjectId required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const adminToken = req.query.admin.adminToken
    const targetObjectId = req.query.targetObjectId
    userAuthAdmin({
        email: email,
        password: password,
        adminToken: adminToken,
    }).then(isAuthenticated => {
        if (isAuthenticated == true) {
            objectUnSetPremium({
                targetObjectId: targetObjectId
            }).then(isModified => {
                res.send({
                    isModified: isModified
                })
            })
        }
    })
})

router.post('/objectSuspend', (req, res) => {
    if (!req.query.user || !req.query.admin || !req.query.targetObjectId) return res.status(400).json({ message: 'user/admin/targetObjectId required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const adminToken = req.query.admin.adminToken
    const targetObjectId = req.query.targetObjectId
    userAuthAdmin({
        email: email,
        password: password,
        adminToken: adminToken,
    }).then(isAuthenticated => {
        if (isAuthenticated == true) {
            objectSuspend({
                targetObjectId: targetObjectId
            }).then(isModified => {
                res.send({
                    isModified: isModified
                })
            })
        }
    })
})

router.post('/objectUnSuspend', (req, res) => {
    if (!req.query.user || !req.query.admin || !req.query.targetObjectId) return res.status(400).json({ message: 'user/admin/targetObjectId required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const adminToken = req.query.admin.adminToken
    const targetObjectId = req.query.targetObjectId
    userAuthAdmin({
        email: email,
        password: password,
        adminToken: adminToken,
    }).then(isAuthenticated => {
        if (isAuthenticated == true) {
            objectUnSuspend({
                targetObjectId: targetObjectId
            }).then(isModified => {
                res.send({
                    isModified: isModified
                })
            })
        }
    })
})

router.post('/objectList', (req, res) => {
    if (!req.query.category) return res.status(400).json({ message: 'category required' })
    const category = req.query.category
    objectList({
        category: category
    }).then(objectArray => {
        res.send({
            objectArray: objectArray
        })
    })
})

router.post('/objectListPremium', (req, res) => {
    if (!req.query.user || !req.query.premium || !req.query.category) return res.status(400).json({ message: 'user/premium/category required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const premiumToken = req.query.premium.premiumToken
    const category = req.query.category
    userAuthPremium({
        email: email,
        password: password,
        premiumToken: premiumToken
    }).then(isAuthenticated => {
        if (isAuthenticated == true) {
            objectListPremium({
                category: category
            }).then(objectArray => {
                res.send({
                    objectArray: objectArray
                })
            })
        }
    })
})

router.post('/objectListAdmin', (req, res) => {
    if (!req.query.user || !req.query.admin || !req.query.category) return res.status(400).json({ message: 'user/admin/category required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const adminToken = req.query.admin.adminToken
    const category = req.query.category
    userAuthAdmin({
        email: email,
        password: password,
        adminToken: adminToken
    }).then(isAuthenticated => {
        if (isAuthenticated == true) {
            objectListAdmin({
                category: category
            }).then(objectArray => {
                res.send({
                    objectArray: objectArray
                })
            })
        }
    })
})

router.post('/tagCreate', (req, res) => {
    if (!req.query.tagName) return res.status(400).json({ message: 'tagName required' })
    const tagName = req.query.tagName
    tagCreate({ tagName: tagName })
        .then(newTagId => {
            res.send({
                newTagId: newTagId
            })
        })
})

router.post('/tagSuspend', (req, res) => {
    if (!req.query.user || !req.query.admin || !req.query.targetTagId) return res.status(400).json({ message: 'user/admin/targetTagId required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const adminToken = req.query.admin.adminToken
    const targetTagId = req.query.targetTagId
    userAuthAdmin({
        email: email,
        password: password,
        adminToken: adminToken,
    }).then(isAuthenticated => {
        if (isAuthenticated == true) {
            tagSuspend({
                targetTagId: targetTagId
            }).then(isModified => {
                res.send({
                    isModified: isModified
                })
            })
        }
    })
})

router.post('/tagUnSuspend', (req, res) => {
    if (!req.query.user || !req.query.admin || !req.query.targetTagId) return res.status(400).json({ message: 'user/admin/targetTagId required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const adminToken = req.query.admin.adminToken
    const targetTagId = req.query.targetTagId
    console.log(targetTagId)
    userAuthAdmin({
        email: email,
        password: password,
        adminToken: adminToken,
    }).then(isAuthenticated => {
        if (isAuthenticated == true) {
            tagUnSuspend({
                targetTagId: targetTagId
            }).then(isModified => {
                res.send({
                    isModified: isModified
                })
            })
        }
    })
})

router.get('/tagList', (req, res) => {
    tagList({})
        .then(tagArray => {
            res.send({
                tagArray: tagArray
            })
        })
})

router.post('/tagListAdmin', (req, res) => {
    if (!req.query.user || !req.query.admin) return res.status(400).json({ message: 'user/admin required' })
    const email = req.query.user.email
    const password = req.query.user.password
    const adminToken = req.query.admin.adminToken
    userAuthAdmin({
        email: email,
        password: password,
        adminToken: adminToken
    }).then(isAuthenticated => {
        if (isAuthenticated == true) {
            tagListAdmin({})
                .then(tagArray => {
                    res.send({
                        tagArray: tagArray
                    })
                })
        }
    })
})

module.exports = router